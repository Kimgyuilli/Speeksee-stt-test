class Linear16Processor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0];
    if (!input || input.length === 0) return true;

    const samples = input[0]; // mono only

    // 🔍 오디오 샘플 길이 출력
    console.log("📦 Worklet 수신 샘플 수:", samples.length);

    const pcmData = new Int16Array(samples.length);
    for (let i = 0; i < samples.length; i++) {
      let s = samples[i];
      s = Math.max(-1, Math.min(1, s));
      pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }

    const byteArray = new Uint8Array(pcmData.buffer);
    this.port.postMessage(byteArray);

    return true;
  }
}
registerProcessor("linear16-processor", Linear16Processor);


export const sendMediaFile =async (base64Photo ) => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: base64Photo
    };
    return await  fetch('http://193.106.55.101:3000', requestOptions)
      .then(response => response.arrayBuffer())
      .then(data => {
        const int8 = (new Uint8Array(data))
        return new TextDecoder('utf8').decode(int8);

      });
}
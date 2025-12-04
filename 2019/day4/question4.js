const splitPassword = (password) => {
  const splitted = [];
  let remaining = password;
  while (remaining > 0) {
    splitted.unshift(remaining % 10);
    remaining = Math.floor(remaining / 10);
  }
  return splitted;
};

const isIntergersAscending = (splitedPassword) => {
  let i = 0;
  while (i++ < splitedPassword.length) {
    if (splitedPassword[i] < splitedPassword[i - 1]) {
      return false;
    }
  }
  return true;
};

const chunkData = (data) => {
  const chunks = [];
  let smallerChunks = [data[0]];
  let index = 1;
  while(index < data.length){
    if(smallerChunks[smallerChunks.length - 1] === data[index]){
      smallerChunks.push(data[index])
    } else {
      chunks.push(smallerChunks);
      smallerChunks = [data[index]];
    }
    index++;
  }
  chunks.push(smallerChunks)
  return chunks
};

const isThereConsecutiveNumPair = (splitedPassword) => {
  const chunks = chunkData(splitedPassword);
  for (let index = 0; index < chunks.length; index++) {
    if (chunks[index].length === 2) {
      return true;
    }
  }
  return false;
};

const main = (start, end) => {
  let passwordCounter = 0;
  for (let password = start; password <= end; password++) {
    const splittedPassword = splitPassword(password);
    if (
      isIntergersAscending(splittedPassword) &&
      isThereConsecutiveNumPair(splittedPassword)
    ) {
      passwordCounter++;
    }
  }
  return passwordCounter;
};

console.log(main(382345, 843167));

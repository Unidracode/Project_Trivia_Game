const triviaAPI = async (token) => {
  // console.log(token);
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const request = await fetch(url);
  const data = await request.json();
  // console.log(data);
  return data;
};

export default triviaAPI;

const triviaAPI = async (token) => {
  console.log(token)
  try {
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const request = await fetch(url);
    const data = await request.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export default triviaAPI;

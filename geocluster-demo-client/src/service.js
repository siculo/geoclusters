export class Entities {
  get = async () => {
    const options = {
      method: 'GET',
    }
    const request = new Request("http://localhost:8080/entities", options);
    const response = await fetch (request);
    return response.json();
  }
}
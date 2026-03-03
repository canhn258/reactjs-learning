export default function getData(url: string) {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${res.status} ${res.statusText}`,
      );
    }
    return res.json();
  });
}

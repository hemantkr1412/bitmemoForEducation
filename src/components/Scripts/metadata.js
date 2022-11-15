import { Web3Storage } from "web3.storage";

function makeStorageClient() {
  return new Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQyRjVFZkI5QmZFOThhOGQ4YkQ0NzVmMTg4OTU5N2YxQ2M2QzBiMkIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTg0OTc1NzYxNzksIm5hbWUiOiJibG9rY3JlZCJ9.VwdALjKL1nRP9uiKkjlAnDcK7x2_RZi-28viJ4sXNgU",
  });
}

export async function storeFiles(file) {
  const files = [file];
  const client = makeStorageClient();
  const cid = await client.put(files);
  return cid;
}

function makeFileObjects(obj) {
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
  const file = new File([blob], "metadata.json");
  return file;
}

export async function create_metadata(file, name, description) {
  const imageHash = await storeFiles(file);
  const imageURL = "https://" + imageHash + ".ipfs.w3s.link/" + file.name;
  const metadata = { name: name, description: description, image: imageURL };
  const metadatajsonfile = makeFileObjects(metadata);
  const metadataHash = await storeFiles(metadatajsonfile);
  const metadataURL =
    "https://" + metadataHash + ".ipfs.w3s.link/metadata.json";
  return { imageURL, metadataURL, status: "Success" };
}

export async function addFrame(file) {
  const imageHash = await storeFiles(file);
  const imageURL = "http://" + imageHash + ".ipfs.w3s.link/" + file.name;
  return imageURL;
}

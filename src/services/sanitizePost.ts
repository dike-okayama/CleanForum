import * as toxicity from "@tensorflow-models/toxicity";

const threshold = 0.5;
const toxicityLabels: string[] = [];

let modelPromise = toxicity.load(threshold, toxicityLabels);

export default async function sanitizePost(post: string) {
  const model = await modelPromise;
  const predictions = await model.classify(post);
  return predictions;
}

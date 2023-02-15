export const labelSlotName = "labelContent";
export const errorsSlotName = "errors";
export const hintsSlotName = "hints";
export const listSlotName = "list";

export const defaultArgs = {};

export const clientSideValue = [];

export async function onUploadData(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`test${Math.random()}test+pqql4B8hlPlIsuvkdtKbkr40lpA==`);
    }, 1000);
  });
}

export async function onGenerateFileFromSharepointId(data) {
  console.log("onGenerateFileFromSharepointId", data);
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          new File(["foo"], "foo.txt", {
            type: "image/png",
          })
        ),
      1000
    );
  });
}

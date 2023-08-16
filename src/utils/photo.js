export const makeImageFormData = (name, images) => {
  // *** REQUIREMENT ***
  // images: [{ uri, name, type }]

  const formData = new FormData();

  if (images?.length) {
    for (let i = 0; i < images.length; i++) {
      formData.append(name, images[i]);
    }
  } else {
    formData.append(name, images);
  }

  return formData;
};

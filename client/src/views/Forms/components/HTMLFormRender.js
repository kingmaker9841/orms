import React from "react";

const HTMLFormRender = (props) => {
  const formData = props.formData || "";

  return (
    <div
      id="html-form-segment"
      className="my-2"
      dangerouslySetInnerHTML={{
        __html: formData,
      }}
    />
  );
};

export default HTMLFormRender;

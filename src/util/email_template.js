module.exports.userAccessTemplate = (user, document) => {
  const html =
    `<p>Dear ${user.fullName},</p>` +
    `<br/>` +
    `<p>This is to inform that you can access to the ` +
    `${document.name} that has been publish in General Docs recently.</p>` +
    `<br/>` +
    `Thank You!` +
    `<br/>` +
    `${document.owner}` +
    `</p>`;
  return {
    to: user.email,
    subject: "General DMS - Document Uploaded",
    text: "",
    html: html,
  };
};

module.exports.documentUpdateTemplate = (owner, editor, document) => {
  const html =
    `<p>Dear ${owner.fullName},</p>` +
    `<br/>` +
    `<p>This is to inform that the document ${document.name} has been recently updated ` +
    `by <b>${editor.fullName}</b> on General Docs.</p>` +
    `<br/>` +
    `Thank You!` +
    `<br/>` +
    `${editor.fullName}` +
    `</p>`;
  return {
    to: owner.email,
    subject: "General DMS - Document Updated",
    text: "",
    html: html,
  };
};

module.exports.makerCheckerInitiated = (maker, checker, document) => {
  const html =
    `<p>Dear ${checker.fullName},</p>` +
    `<br/>` +
    `<p>This is to inform that new documents has been recently uploaded ` +
    `for your <b>verification</b>. Kindly verify and approve to publish on General Docs.</p>` +
    `<br/>` +
    `Thank You!` +
    `<br/>` +
    `${maker.fullName}` +
    `</p>`;
  return {
    to: checker.email,
    subject: "General DMS - Document Verification",
    text: "",
    html: html,
  };
};

module.exports.makerCheckerApproved = (maker, checker, document) => {
  const html =
    `<p>Dear ${checker.fullName},</p>` +
    `<br/>` +
    `<p>This is to inform that your document ${document.name} has been recently approved ` +
    `by <b>${checker.fullName}</b> and is published on General Docs.</p>` +
    `<br/>` +
    `Thank You!` +
    `<br/>` +
    `${maker.fullName}` +
    `</p>`;
  console.log(document);

  return {
    to: maker.email,
    subject: "General DMS - Document Approved",
    text: "",
    html: html,
  };
};

module.exports.alertEmailTemplate = ({ data, mailingDays, actionName }) => {
  const html = `<div style="width:450px; margin:0 auto;">
      <img  src='../../public/s.jpg' alt='logo' width='400px' height='80px'>
      
    <div class="card border-danger mb-5 mt-4" style="max-width: 30rem;">
      <div class="card-body text-danger">
        <h5 class="card-title">Dear Sir/Ma'am ,</h5>
        <p class="lead">
        It has been observed that you have not ${actionName} any risk into Operational Risk Register Portal for ${mailingDays} or more days. Please provide the justification for the same.
          
        </p>
      </div>
    </div>
   
    <br/>
    <p align='center'>@ Copyright Risk Department<br/>
      Sunrise Bank</p>
    </div>`;

  return {
    to: data.email,
    subject: "Risk Not " + actionName + " from last few Days",
    text: "",
    html: html,
  };
};

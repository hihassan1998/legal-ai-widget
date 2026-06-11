(function () {
  const script = document.currentScript;
  const widgetKey = script.getAttribute("data-key");

  if (!widgetKey) {
    console.error("Missing data-key for legal AI widget");
    return;
  }

  // BUTTON
  const button = document.createElement("div");
  button.innerHTML = "💬";

  Object.assign(button.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "22px",
    zIndex: "999999",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  });

  document.body.appendChild(button);

  // IFRAME (REact app UI)
  const iframe = document.createElement("iframe");

  iframe.src = `http://localhost:3000/widget-frame?key=${widgetKey}`;

  Object.assign(iframe.style, {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "380px",
    height: "600px",
    border: "none",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    display: "none",
    zIndex: "999999"
  });

  document.body.appendChild(iframe);

  let open = false;

  button.onclick = () => {
    open = !open;
    iframe.style.display = open ? "block" : "none";
  };
})();
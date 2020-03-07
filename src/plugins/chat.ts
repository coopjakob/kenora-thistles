export default function(who: string, text: string) {
  if (who === "c") {
    who = "Cooper";
  }

  if (who === "p") {
    who = "Patrik";
  }

  if (who === "a") {
    who = "Ann";
  }

  window.console.info(
    `%c<${who}> ${text}`,
    "background: #000; color: #fff; padding: 5px 10px"
  );
  return true;
}

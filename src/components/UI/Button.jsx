export default function Button({
  textOnly,
  buttonClasses,
  children,
  ...otherProps
}) {
  let cssClass = textOnly ? "text-button" : "button";
  if (buttonClasses) {
    cssClass += buttonClasses;
  }

  return (
    <button className={cssClass} {...otherProps}>
      {children}
    </button>
  );
}

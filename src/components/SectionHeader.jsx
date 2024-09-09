import { useEffect, useState } from "react";

export default function SectionHeader({ remixIconName, headerText, theme }) {
  const [IconComponent, setIconComponent] = useState(null);

  useEffect(() => {
    // Dynamically import the icon based on the `remixIconName` prop
    async function loadIcon() {
      try {
        const { [remixIconName]: LoadedIcon } = await import(
          "@remixicon/react"
        );
        setIconComponent(() => LoadedIcon);
      } catch (error) {
        console.log("Error loading section header icon: ", error);
      }
    }
    loadIcon();
  }, [remixIconName]);

  return (
    <div className="section-header">
      <span>
        {IconComponent && (
          <IconComponent
            size={26} // set custom `width` and `height`
            color={theme === "light" ? "black" : "rgb(133, 145, 170)"} // set `fill` color
            className="my-icon" // add custom class name
          />
        )}
      </span>
      <h2>{`${headerText}`}</h2>
    </div>
  );
}

import { useRef } from "react";

export const ColorPicker = ({ color, setColor }) => {
  const colorPicker = useRef();
  
  const openColorPicker = () => {
    colorPicker.current.click();
  };

  return (
    <div className="">
      <input ref={colorPicker} className="hidden" type="color" value={color} onChange={e => setColor(e.target.value)} />

      <button onClick={openColorPicker} className="" type="button">
        <img className="w-10" src="/color-wheel.png" alt="Color Wheel" />
      </button>
    </div>
  );
};

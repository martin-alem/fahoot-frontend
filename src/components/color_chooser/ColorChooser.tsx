import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

const colors = [
  { name: "Pink", bgColor: "bg-pink-500", selectedColor: "ring-pink-500" },
  { name: "Purple", bgColor: "bg-purple-500", selectedColor: "ring-purple-500" },
  { name: "Blue", bgColor: "bg-blue-500", selectedColor: "ring-blue-500" },
  { name: "Green", bgColor: "bg-green-500", selectedColor: "ring-green-500" },
  { name: "Yellow", bgColor: "bg-yellow-500", selectedColor: "ring-yellow-500" },
  { name: "Rose", bgColor: "bg-rose-500", selectedColor: "ring-rose-500" },
  { name: "Orange", bgColor: "bg-orange-500", selectedColor: "ring-orange-500" },
  { name: "Violet", bgColor: "bg-violet-500", selectedColor: "ring-violet-500" },
  { name: "Indigo", bgColor: "bg-indigo-500", selectedColor: "ring-indigo-500" },
  { name: "Cyan", bgColor: "bg-cyan-500", selectedColor: "ring-cyan-500" },
  { name: "Sky", bgColor: "bg-sky-500", selectedColor: "ring-sky-500" },
  { name: "Teal", bgColor: "bg-teal-500", selectedColor: "ring-teal-500" },
  { name: "Emerald", bgColor: "bg-emerald-500", selectedColor: "ring-emerald-500" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ColorChooser: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState(colors[1]);

  return (
    <RadioGroup value={selectedColor} onChange={setSelectedColor}>
      <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900">Choose a label color</RadioGroup.Label>
      <div className="mt-4 flex items-center gap-4 flex-wrap justify-start">
        {colors.map((color) => (
          <RadioGroup.Option
            key={color.name}
            value={color}
            className={({ active, checked }) =>
              classNames(
                color.selectedColor,
                active && checked ? "ring ring-offset-1" : "",
                !active && checked ? "ring-2" : "",
                "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
              )
            }>
            <RadioGroup.Label as="span" className="sr-only">
              {color.name}
            </RadioGroup.Label>
            <span aria-hidden="true" className={classNames(color.bgColor, "h-8 w-8 rounded-full border border-black border-opacity-10")} />
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default ColorChooser;

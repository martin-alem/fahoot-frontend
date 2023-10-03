import { RadioGroup } from '@headlessui/react';
import { IColorChooseProps } from '../../utils/types';
import { memo } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const ColorChooser: React.FC<IColorChooseProps> = memo(({ colors, selected, setSelected }) => {
  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900">Choose a label color</RadioGroup.Label>
      <div className="mt-4 flex items-center gap-4 flex-wrap justify-start">
        {colors.map((color) => (
          <RadioGroup.Option
            key={color.value}
            value={color}
            className={({ active, checked }) =>
              classNames(
                color?.ring ?? '',
                active && checked ? 'ring ring-offset-1' : '',
                !active && checked ? 'ring-2' : '',
                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
              )
            }
          >
            <RadioGroup.Label as="span" className="sr-only">
              {color.label}
            </RadioGroup.Label>
            <span aria-hidden="true" className={classNames(color.value, 'h-8 w-8 rounded-full border border-black border-opacity-10')} />
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
});

export default ColorChooser;

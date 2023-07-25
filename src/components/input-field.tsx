import { InputHTMLAttributes } from 'react';

interface IInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  type: 'email' | 'text' | 'password';
}

const InputField = ({
  label,
  placeholder,
  type,
  onChange,
  ...props
}: IInputFieldProps) => {
  return (
    <div className='relative '>
      <label
        htmlFor={label.trim()}
        className='block mb-2 font-medium capitalize text-gray-600'
      >
        {label}
      </label>

      <input
        type={type}
        id={label.trim()}
        placeholder={placeholder}
        className='w-full px-4 py-2 transition duration-300 border h-11 border-neutral-300 rounded-xl placeholder:text-neutral-400 focus:border-neutral-500 ring ring-transparent focus:ring-neutral-200 invalid:border-red-500'
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;

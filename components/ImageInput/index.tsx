import React, { useId, useState } from 'react';

import { FaUpload } from "react-icons/fa"

import style from './imageInput.module.css';

import LoadingIcons from "react-loading-icons"

export interface FullFileValue {
  hasFile: true;
  file: File;
  url: string;
}

interface EmptyFileValue {
  hasFile: false;
  file: null;
  url: null;
}

export interface ImageInputProps {
  useFormValue: any
  field: string
}

const ImageInput = ({ useFormValue, field }: ImageInputProps) => {

  const [state, setState] = useState<'EMPTY' | 'LOADING'>('EMPTY');

  const { register, setValue } = useFormValue;

  register(field);

  const id = useId()

  return (
    <div className={style.container}>
      <label htmlFor={id} className={style.label}>

        {state === 'EMPTY' ?
          <div className="button medium primary">
            <FaUpload />
            <span>Upload Receipt</span>
          </div>
          :
          <div className="button medium primary">
            <LoadingIcons.SpinningCircles />
            <span>This may take a while...</span>
          </div>}

      </label >
      <input
        className={style.input}
        id={id}
        type="file"
        onClick={() => setState('LOADING')}
        accept=".jpg, .jpeg, .png, .gif"
        onChange={(e: any) => {
          const file = e.target.files[0];

          const reader = new FileReader();

          reader.addEventListener(
            'load',
            () => {
              const url = reader.result as string;

              setValue(field, { hasFile: true, file, url });
            },
            false
          );
          if (file) reader.readAsDataURL(file);
        }}
      />
    </div >
  );
};
export default ImageInput;
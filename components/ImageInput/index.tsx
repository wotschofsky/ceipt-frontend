import React, { useState } from 'react';

import { FaSpinner, FaUpload } from "react-icons/fa"

import style from './imageInput.module.css';

import spinStyle from "../spinner.module.css"
import Button from '../Button';
import buttonStyle from "../Button/button.module.css"

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

type FileValue = FullFileValue | EmptyFileValue;

const emptyState: EmptyFileValue = { hasFile: false, file: null, url: null };

const ImageInput = ({ useFormValue, field }: any) => {
  const [imgValue, setImgValue] = useState<FileValue>(emptyState);

  const [state, setState] = useState<'EMPTY' | 'LOADING'>('EMPTY');

  const { register, setValue } = useFormValue;

  register(field);

  return (
    <div className={style.container}>
      <label htmlFor="dings" className={style.label}>
        {/* <svg
          className={style.placeholderSvg}
          viewBox="0 0 133 215"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="img1"
              patternUnits="userSpaceOnUse"
              width="100"
              height="100"
            >
              <image
                href={imgValue.url ?? ''}
                x="0"
                y="0"
                width="100"
                height="100"
              />
            </pattern>
          </defs>

          <path
            d="M18.3092 212.706C18.6702 211.173 19.3214 209.751 20.2017 208.504L19.3847 207.927C20.3508 206.559 21.5718 205.383 22.9796 204.47L23.5237 205.309C24.8023 204.48 26.2472 203.886 27.798 203.587L27.6089 202.605C28.417 202.449 29.2509 202.368 30.103 202.368C30.9551 202.368 31.789 202.449 32.5971 202.605L32.4079 203.587C33.9587 203.886 35.4036 204.48 36.6821 205.309L37.2262 204.47C38.634 205.383 39.855 206.559 40.8211 207.928L40.0041 208.504C40.8845 209.752 41.5357 211.173 41.8967 212.706L42.8701 212.477C42.9873 212.974 43.0762 213.483 43.1351 214H43.7329V215H46.7786V214H49.8244V215H52.8701V214H53.4679C53.5268 213.483 53.6157 212.974 53.7328 212.477L54.7062 212.706C55.0672 211.173 55.7184 209.751 56.5988 208.504L55.7817 207.927C56.7478 206.559 57.9689 205.383 59.3766 204.47L59.9207 205.309C61.1993 204.48 62.6442 203.886 64.195 203.587L64.0059 202.605C64.814 202.449 65.6479 202.368 66.5 202.368C67.3521 202.368 68.186 202.449 68.9941 202.605L68.8049 203.587C70.3557 203.886 71.8006 204.48 73.0791 205.309L73.6232 204.47C75.031 205.383 76.252 206.559 77.2181 207.928L76.401 208.504C77.2815 209.752 77.9327 211.173 78.2937 212.706L79.2671 212.477C79.3843 212.974 79.4732 213.483 79.5321 214H80.1299V215H83.1756V214H86.2214V215H89.2671V214H89.8649C89.9238 213.483 90.0126 212.974 90.1298 212.477L91.1032 212.706C91.4642 211.173 92.1154 209.751 92.9957 208.504L92.1787 207.927C93.1448 206.559 94.3659 205.383 95.7736 204.47L96.3177 205.309C97.5963 204.48 99.0412 203.886 100.592 203.587L100.403 202.605C101.211 202.449 102.045 202.368 102.897 202.368C103.749 202.368 104.583 202.449 105.391 202.605L105.202 203.587C106.753 203.886 108.198 204.48 109.476 205.309L110.02 204.47C111.428 205.383 112.649 206.559 113.615 207.928L112.798 208.504C113.678 209.752 114.33 211.173 114.691 212.706L115.664 212.477C115.781 212.974 115.87 213.483 115.929 214H117.191V215H121.565V214H125.939V215H130.313V214H131.5V213.014H132.5V209.042H131.5V205.069H132.5V201.097H131.5V197.125H132.5V193.153H131.5V189.181H132.5V185.208H131.5V181.236H132.5V177.264H131.5V173.292H132.5V169.319H131.5V165.347H132.5V161.375H131.5V157.403H132.5V153.431H131.5V149.458H132.5V145.486H131.5V141.514H132.5V137.542H131.5V133.569H132.5V129.597H131.5V125.625H132.5V121.653H131.5V117.681H132.5V113.708H131.5V109.736H132.5V105.764H131.5V101.792H132.5V97.8195H131.5V93.8473H132.5V89.875H131.5V85.9028H132.5V81.9306H131.5V77.9583H132.5V73.9861H131.5V70.0139H132.5V66.0417H131.5V62.0694H132.5V58.0972H131.5V54.125H132.5V50.1527H131.5V46.1805H132.5V42.2083H131.5V38.2361H132.5V34.2638H131.5V30.2916H132.5V26.3194H131.5V22.3471H132.5V18.3749H131.5V14.4027H132.5V10.4305H131.5V6.45822H132.5V2.48599H131.5V1.5H130.316V0.5H125.948V1.5H121.581V0.5H117.213V1.5H115.991C115.952 2.02967 115.88 2.55091 115.779 3.06177L114.798 2.86768C114.483 4.45929 113.857 5.93898 112.985 7.24064L113.816 7.79697C112.858 9.22856 111.626 10.4609 110.194 11.4194L109.638 10.5884C108.336 11.4599 106.856 12.0862 105.265 12.4011L105.459 13.382C104.629 13.5461 103.773 13.632 102.897 13.632C102.021 13.632 101.165 13.5461 100.335 13.3821L100.529 12.4011C98.9376 12.0862 97.4578 11.46 96.1562 10.5886L95.5999 11.4196C94.1682 10.4611 92.9359 9.22873 91.9774 7.79709L92.8084 7.24078C91.937 5.9391 91.3108 4.45937 90.9959 2.86772L90.0149 3.06178C89.9139 2.55091 89.8425 2.02967 89.8026 1.5H89.2485V0.5H86.2155V1.5H83.1825V0.5H80.1495V1.5H79.5954C79.5555 2.02967 79.4841 2.55091 79.383 3.06177L78.402 2.86768C78.0871 4.45929 77.4609 5.93898 76.5894 7.24064L77.4204 7.79697C76.4619 9.22856 75.2296 10.4609 73.798 11.4194L73.2416 10.5884C71.94 11.4599 70.4603 12.0862 68.8687 12.4011L69.0628 13.382C68.2334 13.5461 67.3767 13.632 66.501 13.632C65.6253 13.632 64.7685 13.5461 63.9392 13.382L64.1332 12.401C62.5416 12.0861 61.0618 11.4599 59.7601 10.5885L59.2038 11.4194C57.7721 10.461 56.5396 9.22869 55.581 7.79714L56.4119 7.24075C55.5403 5.93908 54.914 4.45938 54.599 2.86776L53.618 3.06189C53.5169 2.55099 53.4455 2.02971 53.4056 1.5H52.8515V0.5H49.8185V1.5H46.7855V0.5H43.7525V1.5H43.1984C43.1585 2.02967 43.0871 2.55091 42.986 3.06177L42.0051 2.86768C41.6902 4.45929 41.0639 5.93898 40.1924 7.24064L41.0234 7.79697C40.0649 9.22856 38.8326 10.4609 37.401 11.4194L36.8446 10.5884C35.543 11.4599 34.0633 12.0862 32.4717 12.4011L32.6658 13.382C31.8364 13.5461 30.9797 13.632 30.104 13.632C29.2282 13.632 28.3716 13.5461 27.5422 13.3821L27.7363 12.4011C26.1446 12.0862 24.6649 11.46 23.3632 10.5886L22.8069 11.4196C21.3752 10.4611 20.1429 9.22873 19.1844 7.79709L20.0154 7.24078C19.144 5.93909 18.5178 4.45937 18.2029 2.86772L17.2219 3.06178C17.1209 2.55091 17.0495 2.02967 17.0096 1.5H15.788V0.5H11.42V1.5H7.052V0.5H2.684V1.5H1.5V2.48611H0.5V6.45833H1.5V10.4306H0.5V14.4028H1.5V18.375H0.5V22.3472H1.5V26.3194H0.5V30.2917H1.5V34.2639H0.5V38.2361H1.5V42.2083H0.5V46.1805H1.5V50.1528H0.5V54.125H1.5V58.0972H0.5V62.0694H1.5V66.0417H0.5V70.0139H1.5V73.9861H0.5V77.9583H1.5V81.9305H0.5V85.9028H1.5V89.875H0.5V93.8472H1.5V97.8194H0.5V101.792H1.5V105.764H0.5V109.736H1.5V113.708H0.5V117.681H1.5V121.653H0.5V125.625H1.5V129.597H0.5V133.569H1.5V137.542H0.5V141.514H1.5V145.486H0.5V149.458H1.5V153.431H0.5V157.403H1.5V161.375H0.5V165.347H1.5V169.319H0.5V173.292H1.5V177.264H0.5V181.236H1.5V185.208H0.5V189.181H1.5V193.153H0.5V197.125H1.5V201.097H0.5V205.07H1.5V209.042H0.5V213.014H1.5V214H2.687V215H7.061V214H11.435V215H15.809V214H17.0709C17.1298 213.483 17.2187 212.974 17.3358 212.477L18.3092 212.706Z"
            // strokeWidth="2"
            // strokeDasharray="10 10"
            // fill={imgValue.hasFile ? 'url(#img1)' : 'transparent'}
            // fill="transparent"
          />
        </svg> */}

        <div className={buttonStyle.button} style={{ borderRadius: "2px", width: "30rem", padding: "0 10rem" }}>
          <div style={{ display: "flex", alignItems: "center" }}>{state === 'EMPTY' ? <><FaUpload style={{ width: "1rem", height: "1rem" }} /><span style={{ whiteSpace: "nowrap", paddingLeft: "0.5rem" }}>Upload Receipt</span></> : <><FaSpinner className={spinStyle.spin} /><span style={{ whiteSpace: "nowrap", paddingLeft: "0.5rem" }}>This may take a while...</span></>}</div>
        </div>

        {/* <Button label={state === 'EMPTY' ? <FaUpload style={{ color: "white !important", width: "1rem", height: "1rem" }}/> : <FaSpinner className={spinStyle.spin} />} style={{ borderRadius: "2px" }} /> */}

        {/* <span className={style.placeholderText}>
          {state === 'EMPTY' ? '+' : <FaSpinner className={spinStyle.spin} />}
        </span> */}
      </label>
      <input
        className={style.input}
        id="dings"
        type="file"
        onClick={() => setState('LOADING')}
        onChange={(e: any) => {
          const file = e.target.files[0];

          const reader = new FileReader();

          reader.addEventListener(
            'load',
            () => {
              const url = reader.result as string;

              setImgValue({ hasFile: true, file, url });

              setValue(field, { hasFile: true, file, url });
            },
            false
          );

          if (file) reader.readAsDataURL(file);
        }}
      />
    </div>
  );
};
export default ImageInput;

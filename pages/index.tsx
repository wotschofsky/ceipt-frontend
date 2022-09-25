import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';

import Button from '../components/Button';
import ImageInput, { FullFileValue } from '../components/ImageInput';
import ReceiptSvg from '../components/ReceiptSvg';
import TextInput from '../components/TextInput';
import apiClient from '../services/apiClient';

import spinStyle from "../components/spinner.module.css"

interface DefaultState {
  type: 'DEFAULT';
}
interface ProcessingState {
  type: 'PROCESSING';

  fileData: FullFileValue;
}
interface ReadyToSubmitState {
  type: 'READY_TO_SUBMIT';

  fileData: FullFileValue;
  receiptData: any;
}
interface SubmittingState {
  type: 'SUBMITTING';

  fileData: FullFileValue;
  receiptData: any;
}

type PageState = DefaultState | ProcessingState | ReadyToSubmitState | SubmittingState;

const defaultState: DefaultState = { type: 'DEFAULT' };

export default function Page() {

  const [pageState, setPageState] = useState<PageState>(defaultState);

  const router = useRouter();

  const useFormValue = useForm({ shouldUseNativeValidation: true });

  const { handleSubmit, watch } = useFormValue;

  const processImage: SubmitHandler<{ fileValue: FullFileValue }> = async (values) => {
  
    const { fileValue } = values;

    setPageState({ type: 'PROCESSING', fileData: fileValue });

    const receiptData = await apiClient().getReceiptFromImg(fileValue.file);

    setPageState({ type: 'READY_TO_SUBMIT', fileData: fileValue, receiptData });
  };

  useEffect(() => {
    // @ts-ignore
    if (watch('fileValue')?.hasFile) handleSubmit(processImage)();

  }, [watch('fileValue')]);

  if (pageState.type === 'DEFAULT' || pageState.type === "PROCESSING")
    return (
      <ImageInput useFormValue={useFormValue} field="fileValue" />
    );

  if (pageState.type === 'READY_TO_SUBMIT' || pageState.type === "SUBMITTING") {
  
    const submitImage: SubmitHandler<{ username: string }> = async (values) => {

      if (!values.username) return

      // @ts-ignore
      setPageState(prev => ({...prev, type: "SUBMITTING"}))

      const data = await apiClient().createReceipt({ ...pageState.receiptData, ownerName: values.username });

      router.push('/receipts/' + data.data._id);
    };

    return (
      // @ts-ignore
      <form onSubmit={handleSubmit(submitImage)}>
        <div style={{ width: "20rem" }}>

          <TextInput placeholder="Your Name" useFormValue={useFormValue} field="username" required />

          <div style={{ padding: "1rem 0" }}>
            <ReceiptSvg receipt={pageState.receiptData} style={{ width: "100%" }} />
          </div>

          <Button label={pageState.type === "SUBMITTING" ? <FaSpinner className={spinStyle.spin} /> : "Post Receipt"} type="submit" />
        </div>
      </form>

    );
  }
}

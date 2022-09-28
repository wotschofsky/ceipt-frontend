import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import LoadingIcons from "react-loading-icons"
import ImageInput, { FullFileValue } from '../components/ImageInput';
import TextInput from '../components/TextInput';
import apiClient from '../services/apiClient';

import Receipt from '../definitions/Receipt';
import getSvgStr from '../utils/getSvgStr';
import Image from 'next/image';

interface EmptyState {
  type: 'EMPTY';
}
interface ProcessingState {
  type: 'PROCESSING';

  fileData: FullFileValue;
}
interface ReadyToSubmitState {
  type: 'READY_TO_SUBMIT';

  fileData: FullFileValue;
  receipt: Receipt;
}
interface SubmittingState {
  type: 'SUBMITTING';

  fileData: FullFileValue;
  receipt: Receipt;
}

type PageState = EmptyState | ProcessingState | ReadyToSubmitState | SubmittingState;

const defaultState: EmptyState = { type: 'EMPTY' };

export default function Page() {

  const [pageState, setPageState] = useState<PageState>(defaultState);

  const router = useRouter();

  const useFormValue = useForm({ shouldUseNativeValidation: true });

  const { handleSubmit, watch } = useFormValue;

  const processImage: SubmitHandler<{ fileValue: FullFileValue }> = async (values) => {

    const { fileValue } = values;

    setPageState({ type: 'PROCESSING', fileData: fileValue });

    const receipt = await apiClient().getReceiptFromImg(fileValue.file);

    setPageState({ type: 'READY_TO_SUBMIT', fileData: fileValue, receipt });
  };

  useEffect(() => {
    // @ts-ignore
    if (watch('fileValue')?.hasFile) handleSubmit(processImage)();

  }, [watch('fileValue')]);

  if (pageState.type === 'EMPTY' || pageState.type === "PROCESSING")
    return (
      <ImageInput useFormValue={useFormValue} field="fileValue" />
    );

  if (pageState.type === 'READY_TO_SUBMIT' || pageState.type === "SUBMITTING") {

    const submitImage: SubmitHandler<{ username: string }> = async (values) => {

      if (!values.username) return

      // @ts-ignore
      setPageState(prev => ({ ...prev, type: "SUBMITTING" }))

      const data = await apiClient().createReceipt({ ...pageState.receipt, ownerName: values.username });

      router.push('/receipts/' + data.data._id);
    };

    return (
      // @ts-ignore
      <form onSubmit={handleSubmit(submitImage)}>
        <div style={{ width: "20rem" }}>

          <TextInput placeholder="Your Name" useFormValue={useFormValue} field="username" required />

          <div style={{ padding: "1rem 0" }}>
            <img src={"data:image/svg+xml;utf8," + encodeURIComponent(getSvgStr(pageState.receipt))} style={{ width: "100%" }} />
          </div>

          {pageState.type === "SUBMITTING" ?

            <button className="button long primary" type="submit"><LoadingIcons.SpinningCircles /></button>
            :
            <button className="button long primary" type="submit">Post Receipt</button>
          }
        </div>
      </form>

    );
  }
}

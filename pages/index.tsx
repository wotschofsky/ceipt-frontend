import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
interface LoadingState {
  type: 'LOADING';

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


type PageState = DefaultState | LoadingState | ReadyToSubmitState | SubmittingState;

const defaultState: DefaultState = { type: 'DEFAULT' };

export default function Page() {
  const [pageState, setPageState] = useState<PageState>(defaultState);

  const useFormValue = useForm({ shouldUseNativeValidation: true });

  const router = useRouter();

  const { handleSubmit, watch } = useFormValue;

  const onSubmit = async (data: { fileValue: FullFileValue }) => {
    const { fileValue } = data;

    setPageState({ type: 'LOADING', fileData: fileValue });

    const receiptData = await apiClient().getReceiptFromImg(fileValue.file);

    setPageState({ type: 'READY_TO_SUBMIT', fileData: fileValue, receiptData });
  };

  useEffect(() => {
    if (!watch('fileValue')?.hasFile) {
      return;
    }

    // @ts-ignore
    handleSubmit(onSubmit)();
  }, [watch('fileValue')]);

  if (pageState.type === 'DEFAULT' || pageState.type === "LOADING")
    return (
      <ImageInput useFormValue={useFormValue} field="fileValue" />
    );
  if (pageState.type === 'READY_TO_SUBMIT' || pageState.type === "SUBMITTING") {
    const postDings = async (values: any) => {

      if (!values.username) return

      setPageState(prev => ({...prev, type: "SUBMITTING"}))

      const data = await apiClient().createReceipt({ ...pageState.receiptData, ownerName: values.username });

      router.push('/receipts/' + data.data._id);
    };

    return (

      <form onSubmit={handleSubmit(postDings)}>
        <div style={{ width: 'fit-content' }}>

          <TextInput placeholder="Your Name" useFormValue={useFormValue} field="username" required />


          <div style={{ padding: "1rem 0" }}>
            <ReceiptSvg receipt={pageState.receiptData} style={{ width: "100%" }} />
          </div>

          <Button label={pageState.type === "SUBMITTING" ? <FaSpinner className={spinStyle.spin} /> : "Post Receipt"} type="submit" />
        </div>
      </form>

    );
  }

  // useEffect(() => {

  //   (async () => {

  //     // const data = await apiClient().postReceipt({ ownerUserId: "linus-balls", img: "moin" })

  //     const data = await apiClient().getReceiptsByOwnerId("linus-balls")

  //     setReceipts(data)
  //   })()
  // }, [])

  // if (typeof window !== "undefined") {

  //   let recorder = null

  //   async function recordStream() {
  //       const stream = await captureMediaDevices()
  //       recorder = new MediaRecorder(stream)
  //       let chunks = []

  //       recorder.ondataavailable = (event) => {
  //           if (event.data.size > 0) {
  //               chunks.push(event.data)
  //           }
  //       }

  //       recorder.onstop = () => {
  //           const blob = new Blob(chunks, {
  //               type: 'video/webm;codecs=vp9',
  //           })

  //           chunks = []
  //           const blobUrl = URL.createObjectURL(blob)

  //           console.log(blobUrl)
  //       }

  //       recorder.start(200)
  //   }
  //   recordStream()
  // }

  // navigator.mediaDevices.getUserMedia({ video: true })
  //   .then((stream) => {
  //     /* use the stream */

  //     console.log(stream.getVideoTracks()?.[0])
  //   })
  //   .catch((err) => {
  //     /* handle the error */
  //   });

  // {receipts.slice(0, 1).map(i => <ReceiptCard receipt={i}/>)}
}

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../components/Button';
import Header from '../components/Header';
import ImageInput, { FullFileValue } from '../components/ImageInput';
import ReceiptCard from '../components/ReceiptCard';
import apiClient from '../services/apiClient';

interface DefaultState {
  type: 'DEFAULT';
}
interface LoadingState {
  type: 'LOADING';

  fileData: FullFileValue;
}
interface ReadyToSubmitState {
  type: 'READY_TO_SUBMIT';

  fileData: any;
  receiptData: any;
}

type PageState = DefaultState | LoadingState | ReadyToSubmitState;

const defaultState: DefaultState = { type: 'DEFAULT' };

export default function Page() {
  const [pageState, setPageState] = useState<PageState>(defaultState);

  const [receipts, setReceipts] = useState<any[]>([]);

  const useFormValue = useForm({ shouldUseNativeValidation: true });

  const { handleSubmit, watch } = useFormValue;

  const onSubmit = async (data: { fileValue: FullFileValue }) => {
    const { fileValue } = data;

    setPageState({ type: 'LOADING', fileData: fileValue });

    const receiptData = await apiClient().getReceiptFromImg(fileValue.file);

    setPageState({ type: 'READY_TO_SUBMIT', fileData: fileValue, receiptData });
  };

  useEffect(() => {
    if (!watch('fileValue')?.hasFile) return;

    handleSubmit(onSubmit)();
  }, [watch('fileValue')]);

  if (pageState.type === 'DEFAULT')
    return (
      <div
        style={{
          position: 'relative',
          top: '20rem',
          height: 'calc(100vh - 25rem)',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div style={{ paddingBottom: '2rem' }}>
          <ImageInput useFormValue={useFormValue} field="fileValue" />
        </div>

        {/* <Button onClick={handleSubmit(onSubmit)} label="get receipt from image" /> */}
      </div>
    );
  if (pageState.type === 'READY_TO_SUBMIT') {
    const postDings = async () => {
      const data = await apiClient().postReceipt(pageState.receiptData);

      alert(JSON.stringify(data, null, 2));
    };

    return (
      <div
        style={{
          position: 'relative',
          top: '20rem',
          height: 'calc(100vh - 25rem)',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div style={{ width: 'fit-content' }}>
          <ReceiptCard receipt={pageState.receiptData} />

          <br style={{ height: '2rem' }} />

          <Button onClick={postDings} label="Post Receipt" />
        </div>
      </div>
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

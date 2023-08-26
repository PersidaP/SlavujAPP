import { ThreeDots } from 'react-loader-spinner';
import { usePromiseTracker } from 'react-promise-tracker';

const Loader = () => {
  const { promiseInProgress } = usePromiseTracker();

  return promiseInProgress ? (
    <>
      <div
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: '0',
          bottom: '0',
          right: '0',
          left: '0',
          backgroundColor: 'rgba(0,0,0,0.2)',
          zIndex: 9996,
        }}
      ></div>
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '9999',
        }}
      >
        <ThreeDots color='#000' height='100' width='100' />
      </div>
    </>
  ) : (
    <></>
  );
};

export default Loader;

import dynamic from 'next/dynamic';

const NoSSRWrapper = dynamic(() => import('./Wrapper'), { ssr: false })

export default NoSSRWrapper;
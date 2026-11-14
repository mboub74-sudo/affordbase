import guide from '../../../content/guides/5-vs-20-percent-down-payment-canada.json';
import IllustratedFinancialGuide,{guideMetadata} from '../../components/IllustratedFinancialGuide';
export const metadata=guideMetadata(guide);
export default function Page(){return <IllustratedFinancialGuide guide={guide}/>;}

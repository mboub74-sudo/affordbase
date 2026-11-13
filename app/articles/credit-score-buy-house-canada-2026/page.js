import guide from '../../../content/guides/credit-score-buy-house-canada-2026.json';
import IllustratedFinancialGuide,{guideMetadata} from '../../components/IllustratedFinancialGuide';
export const metadata=guideMetadata(guide);
export default function Page(){return <IllustratedFinancialGuide guide={guide}/>;}

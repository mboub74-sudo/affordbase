import guide from '../../../content/guides/sinking-funds.json';
import FinancialGuide, {guideMetadata} from '../../components/FinancialGuide';
export const metadata=guideMetadata(guide);
export default function Page(){return <FinancialGuide guide={guide}/>;}

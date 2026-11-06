import guide from '../../../content/guides/how-much-emergency-fund-do-i-need.json';
import FinancialGuide, {guideMetadata} from '../../components/FinancialGuide';
export const metadata=guideMetadata(guide);
export default function Page(){return <FinancialGuide guide={guide}/>;}

import guide from '../../../content/guides/debt-snowball-vs-avalanche.json';
import FinancialGuide, {guideMetadata} from '../../components/FinancialGuide';
export const metadata=guideMetadata(guide);
export default function Page(){return <FinancialGuide guide={guide}/>;}

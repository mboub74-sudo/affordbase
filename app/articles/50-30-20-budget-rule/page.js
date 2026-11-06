import guide from '../../../content/guides/50-30-20-budget-rule.json';
import FinancialGuide, {guideMetadata} from '../../components/FinancialGuide';
export const metadata=guideMetadata(guide);
export default function Page(){return <FinancialGuide guide={guide}/>;}

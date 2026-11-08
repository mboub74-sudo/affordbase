import guide from '../../../content/guides/how-to-budget-with-irregular-income.json';
import FinancialGuide, {guideMetadata} from '../../components/FinancialGuide';
export const metadata=guideMetadata(guide);
export default function Page(){return <FinancialGuide guide={guide}/>;}

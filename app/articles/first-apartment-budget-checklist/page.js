import guide from '../../../content/guides/first-apartment-budget-checklist.json';
import IllustratedFinancialGuide, {guideMetadata} from '../../components/IllustratedFinancialGuide';
export const metadata=guideMetadata(guide);
export default function Page(){return <IllustratedFinancialGuide guide={guide}/>;}

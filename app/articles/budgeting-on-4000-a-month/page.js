import guide from '../../../content/guides/budgeting-on-4000-a-month.json';
import IllustratedFinancialGuide,{guideMetadata} from '../../components/IllustratedFinancialGuide';
export const metadata=guideMetadata(guide);
export default function Page(){return <IllustratedFinancialGuide guide={guide}/>;}

import guide from '../../../content/guides/holiday-budget-planner-canada-us.json';
import IllustratedFinancialGuide, {guideMetadata} from '../../components/IllustratedFinancialGuide';
export const metadata=guideMetadata(guide);
export default function Page(){return <IllustratedFinancialGuide guide={guide}/>;}

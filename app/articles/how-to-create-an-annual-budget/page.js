import guide from '../../../content/guides/how-to-create-an-annual-budget.json';
import IllustratedFinancialGuide,{guideMetadata} from '../../components/IllustratedFinancialGuide';
export const metadata=guideMetadata(guide);
export default function Page(){return <IllustratedFinancialGuide guide={guide}/>;}

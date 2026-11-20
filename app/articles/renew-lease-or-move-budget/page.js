import guide from '../../../content/guides/renew-lease-or-move-budget.json';
import IllustratedFinancialGuide, {guideMetadata} from '../../components/IllustratedFinancialGuide';
export const metadata=guideMetadata(guide);
export default function Page(){return <IllustratedFinancialGuide guide={guide}/>;}

import guide from '../../../content/guides/car-loan-mortgage-affordability-canada.json';
import IllustratedFinancialGuide,{guideMetadata} from '../../components/IllustratedFinancialGuide';
export const metadata=guideMetadata(guide);
export default function Page(){return <IllustratedFinancialGuide guide={guide}/>;}

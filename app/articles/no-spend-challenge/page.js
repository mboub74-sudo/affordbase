import guide from '../../../content/guides/no-spend-challenge.json';
import IllustratedFinancialGuide, {guideMetadata} from '../../components/IllustratedFinancialGuide';
export const metadata=guideMetadata(guide);
export default function Page(){return <IllustratedFinancialGuide guide={guide}/>;}

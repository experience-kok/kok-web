import { CampaignCategoryName, CampaignCategoryType, CampaignType } from 'types/campaign';

export interface PostCampaignRequest {
  thumbnailUrl: string;
  campaignType: CampaignType;
  title: string;
  productShortInfo: string;
  maxApplicants: number;
  productDetails: string;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  applicationDeadlineDate: string;
  selectionDate: string;
  reviewDeadlineDate: string;
  selectionCriteria: string;
  missionGuide: string;
  missionKeywords: string[];
  category: {
    type: CampaignCategoryType;
    name: CampaignCategoryName;
  };
  companyInfo: {
    companyName: string;
    businessRegistrationNumber: string;
    contactPerson: string;
    phoneNumber: string;
  };
}

export enum RatingType {
  STAR = 'star',
  SELF = 'self',
}

export enum CancellationType {
  FREE_CANCELLATION = 'FREE_CANCELLATION',
  NOT_REFUNDABLE = 'NOT_REFUNDABLE',
}

export enum PromotionType {
  MEMBER = 'MEMBER',
  CAMPAIGN = 'CAMPAIGN',
}

export type Rating = {
  ratingValue: number;
  ratingType: RatingType;
};

export type PreviewImage = {
  url: string;
  caption: string;
  imageType: string;
};

export type Property = {
  propertyId: string;
  title: string;
  address: string[];
  previewImage: PreviewImage;
  rating: Rating;
};

export type Promotion = {
  title: string;
  type: PromotionType;
};

export type Price = {
  amount: number;
  currency: string;
};

export type CancellationOption = {
  cancellationType: CancellationType;
};

export type Offer = {
  promotion: Promotion;
  name: string;
  displayPrice: Price;
  savings?: Price | null;
  cancellationOption: CancellationOption;
};

export type Hotel = {
  id: string;
  property: Property;
  offer: Offer;
};
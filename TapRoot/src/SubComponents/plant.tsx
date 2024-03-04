export interface Plant {
  id: number;
  common_name: string;
  watering:string;
  default_image: {
    original_url:string
  } | null;
} 

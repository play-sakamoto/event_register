export interface Event {
  id: number;
  title: string;
  description?: string;
  start_time: string | Date;
  end_time: string | Date;
  user_id: number;
  itemCount?: number; // Optional, as per instructions
  totalSales?: number; // Optional, as per instructions
}

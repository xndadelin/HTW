export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Tables = {
  profiles: Profile;
};

export type Database = {
  public: {
    Tables: Tables;
  };
};

import { useState, useEffect } from "react";
import api from "../../../lib/api";
import axios from "axios";
import toast from "react-hot-toast";

export interface Member {
  id: string;
  name: string;
  level: number;
  position?: string;
  children: Member[];
}

export const useNetwork = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapReferral = (ref: any, level: number): Member => {
  const children: Member[] = [];

    if (ref.next_level) {
      for (const key of Object.keys(ref.next_level)) {
        ref.next_level[key].forEach((child: any) => {
          children.push(mapReferral(child, level + 1));
        });
      }
    }

    return {
      id: ref.user_id,
      name: ref.name,
      level,
      position: ref.position,
      children,
    };
  };

 
  const mapToMemberTree = (user: any): Member => {
    const children: Member[] = [];
    const referrals = user.referrals?.["Level 1"] || [];
    referrals.forEach((ref: any) => {
      children.push(mapReferral(ref, 1));
    });

    return {
      id: user.user_id,
      name: user.first_name + " " + user.last_name,
      level: 0,
      position: user.position,
      children,
    };
  };

  useEffect(() => {
    const fetchNetwork = async () => {
      try {
        setLoading(true);
        const response = await api.get("/profile/"); 
        const rootMember = mapToMemberTree(response.data);
        setMembers([rootMember]); 
      } catch (err :any) {
        let message = "Failed to load account details";
        if (axios.isAxiosError(err)) {
          if (err.response?.data?.error) {
            message = err.response.data.error;
          } else if (err.message) {
            message = err.message;
          }
        }
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchNetwork();
  }, []);

  return {
    members,
    loading,
    error,
    setMembers, 
  };
};

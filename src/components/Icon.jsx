import {
  Rocket, Star, Heart, Zap, Award, Target, TrendingUp, Briefcase,
  Users, User, Mail, Phone, MapPin, Globe, Calendar, Clock,
  Camera, Image, Video, Music, Headphones, Mic, Settings, Wrench,
  ShoppingCart, ShoppingBag, CreditCard, DollarSign, Gift, Tag,
  MessageCircle, MessageSquare, Send, Share2, ThumbsUp, Bell,
  Shield, Lock, Key, CheckCircle, Check, Flag, Bookmark,
  Home, Building, Store, Truck, Package, Box, Layers, Grid3x3,
  Smartphone, Laptop, Monitor, Wifi, Cloud, Database, Code, Terminal,
  PenTool, Edit, FileText, Folder, Search, Filter, Sliders,
  Sun, Moon, Coffee, Compass, Map, Navigation, Anchor, Feather,
  Instagram, Facebook, Twitter, Linkedin, Youtube, Github,
} from 'lucide-react';

// Mesmo conjunto de ícones do seletor no admin.
// O nome (string) vem do content.json e é resolvido para o componente aqui.
const ICON_MAP = {
  Rocket, Star, Heart, Zap, Award, Target, TrendingUp, Briefcase,
  Users, User, Mail, Phone, MapPin, Globe, Calendar, Clock,
  Camera, Image, Video, Music, Headphones, Mic, Settings, Wrench,
  ShoppingCart, ShoppingBag, CreditCard, DollarSign, Gift, Tag,
  MessageCircle, MessageSquare, Send, Share2, ThumbsUp, Bell,
  Shield, Lock, Key, CheckCircle, Check, Flag, Bookmark,
  Home, Building, Store, Truck, Package, Box, Layers, Grid3x3,
  Smartphone, Laptop, Monitor, Wifi, Cloud, Database, Code, Terminal,
  PenTool, Edit, FileText, Folder, Search, Filter, Sliders,
  Sun, Moon, Coffee, Compass, Map, Navigation, Anchor, Feather,
  Instagram, Facebook, Twitter, Linkedin, Youtube, Github,
};

export function Icon({ name, size = 24, ...props }) {
  const Cmp = name && ICON_MAP[name];
  if (!Cmp) return null;
  return <Cmp size={size} {...props} />;
}

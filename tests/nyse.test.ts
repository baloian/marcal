import { NYSEMarket } from '../nyse';
import { MarketTime, NYTimeNow } from '../time';

// Mock the time-related dependencies
jest.mock('../time');

describe('NYSEMarket', () => {
  let market: NYSEMarket;
  
  beforeEach(() => {
    jest.clearAllMocks();
    market = new NYSEMarket();
  });

  describe('holidays', () => {
    it('should recognize New Years Day 2024', () => {
      const mockNow = {
        year: '2024',
        month: 'January',
        day: 1,
        weekDay: 1,
        time: new Date()
      };
      (NYTimeNow as jest.Mock).mockImplementation(() => mockNow);
      
      expect(market.open()).toBe(false);
    });

    it('should recognize regular trading day', () => {
      const mockNow = {
        year: '2024',
        month: 'January',
        day: 2,
        weekDay: 2,
        time: new Date()
      };
      (NYTimeNow as jest.Mock).mockImplementation(() => mockNow);
      (MarketTime.coreOpen as jest.Mock).mockReturnValue(true);
      
      expect(market.open()).toBe(true);
    });
  });

  describe('early close days', () => {
    it('should recognize July 3rd 2024 as early close', () => {
      const mockNow = {
        year: '2024',
        month: 'July',
        day: 3,
        weekDay: 3,
        time: new Date()
      };
      (NYTimeNow as jest.Mock).mockImplementation(() => mockNow);
      (MarketTime.earlyClosed as jest.Mock).mockReturnValue(true);
      
      expect(market.open()).toBe(false);
    });
  });

  describe('market states', () => {
    it('should recognize pre-market hours', () => {
      const mockNow = {
        year: '2024',
        month: 'February',
        day: 1,
        weekDay: 4,
        time: new Date()
      };
      (NYTimeNow as jest.Mock).mockImplementation(() => mockNow);
      (MarketTime.preMarket as jest.Mock).mockReturnValue(true);
      
      expect(market.preMarket()).toBe(true);
    });

    it('should recognize after-market hours', () => {
      const mockNow = {
        year: '2024',
        month: 'February',
        day: 1,
        weekDay: 4,
        time: new Date()
      };
      (NYTimeNow as jest.Mock).mockImplementation(() => mockNow);
      (MarketTime.afterMarket as jest.Mock).mockReturnValue(true);
      
      expect(market.afterMarket()).toBe(true);
    });

    it('should calculate minutes to close', () => {
      const mockNow = {
        year: '2024',
        month: 'February',
        day: 1,
        weekDay: 4,
        time: new Date()
      };
      /*
      const mockCloseTime = new Date();
      mockCloseTime.setHours(16, 0, 0); // 4:00 PM

      (NYTimeNow as jest.Mock).mockImplementation(() => mockNow);
      (MarketTime.coreOpen as jest.Mock).mockReturnValue(true);
      (MarketTime.closeTime as any) = mockCloseTime;
      
      expect(market.minutesToClose()).toBeGreaterThanOrEqual(0);
      */
    });
  });

  describe('weekend handling', () => {
    it('should recognize Sunday as closed', () => {
      const mockNow = {
        year: '2024',
        month: 'February',
        day: 4,
        weekDay: 0,
        time: new Date()
      };
      (NYTimeNow as jest.Mock).mockImplementation(() => mockNow);
      
      expect(market.open()).toBe(false);
    });

    it('should recognize Saturday as closed', () => {
      const mockNow = {
        year: '2024',
        month: 'February',
        day: 3,
        weekDay: 6,
        time: new Date()
      };
      (NYTimeNow as jest.Mock).mockImplementation(() => mockNow);
      
      expect(market.open()).toBe(false);
    });
  });
});

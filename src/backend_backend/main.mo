import Debug "mo:base/Debug";
import User "path/to/User.mo"; // Adjust the path to your User.mo file

actor Main {

    type HealthAdvice = {
        recommendation: Text;
        reason: Text;
    };

    stable var healthRecommendations: [HealthAdvice] = [
        { recommendation = "Increase daily water intake to 2.5 liters.", reason = "Hydration is essential for maintaining optimal bodily functions." },
        { recommendation = "Engage in 30 minutes of physical activity daily.", reason = "Regular exercise reduces the risk of heart disease and obesity." },
        { recommendation = "Reduce sugar intake.", reason = "Excessive sugar consumption leads to diabetes and weight gain." }
    ];

    // Function to retrieve personalized health advice based on a user's profile
    public func getPersonalizedAdvice(username: Text): async ?[HealthAdvice] {
        let user = await User.getUserData(username);
        switch (user) {
            case (?u) {
                var personalizedAdvice: [HealthAdvice] = [];
                if (u.weight > 80.0) {
                    personalizedAdvice := Array.append<HealthAdvice>(personalizedAdvice, [{ recommendation = "Consider a low-calorie diet.", reason = "Managing weight is crucial for avoiding obesity." }]);
                };
                if (u.lifestyleHabits.contains("Smoking")) {
                    personalizedAdvice := Array.append<HealthAdvice>(personalizedAdvice, [{ recommendation = "Reduce smoking or seek cessation programs.", reason = "Smoking is a leading cause of lung diseases." }]);
                };
                personalizedAdvice := Array.append<HealthAdvice>(personalizedAdvice, healthRecommendations);
                return ?personalizedAdvice;
            };
            case (_) return null;
        }
    };

    // Function to add new health advice
    public func addHealthAdvice(recommendation: Text, reason: Text): async Text {
        healthRecommendations := Array.append<HealthAdvice>(healthRecommendations, [{ recommendation; reason }]);
        return "New health advice added successfully.";
    };

    // Debug function to display all health recommendations
    public func debugHealthRecommendations() : async () {
        Debug.print("Health Recommendations: " # Array.toText(healthRecommendations));
    };
    
    // Debug function to display all users
    public func debugUsers() : async () {
        await User.debugUsers();
    };
};

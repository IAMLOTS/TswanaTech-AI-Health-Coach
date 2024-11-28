import User "mo:backend_backend/user";

// Data structure for health recommendations
type Recommendation = {
    message: Text;
    advice: Text;
};

// Actor for AI Health Coach
actor AIHealthCoach {

    // Function to generate a personalized health recommendation for a user
    public func generateRecommendation(username: Text) : async Recommendation {
        switch (await User.getUserData(username)) {
            case (?user) {
                // Analyze user data and create health recommendations
                let age = user.age;
                let weight = user.weight;
                let height = user.height;
                let healthConditions = user.healthConditions;
                let lifestyleHabits = user.lifestyleHabits;
                
                // Calculate BMI
                let bmi = calculateBMI(weight, height);
                
                // Generate recommendation based on health conditions
                let healthAdvice = generateHealthAdvice(healthConditions);
                
                // Generate lifestyle advice based on habits
                let lifestyleAdvice = generateLifestyleAdvice(lifestyleHabits);
                
                // Generate final health recommendation
                let message = "Personalized Health Recommendation for " # username;
                let advice = "Based on your age (" # Int.toText(age) # "), weight (" # Float.toText(weight) # " kg), and height (" # Float.toText(height) # " cm), your BMI is " # Float.toText(bmi) # ". " # healthAdvice # " " # lifestyleAdvice;
                
                return Recommendation { message = message; advice = advice };
            };
            case (_) return Recommendation { message = "User not found."; advice = "Please ensure the username is correct and registered." };
        };
    };

    // Function to calculate BMI (Body Mass Index)
    private func calculateBMI(weight: Float, height: Float) : Float {
        let heightInMeters = height / 100.0;
        return weight / (heightInMeters * heightInMeters);
    };

    // Function to generate health advice based on health conditions
    private func generateHealthAdvice(healthConditions: [Text]) : Text {
        var advice = "";
        
        // Example conditions: Diabetes, Hypertension, Obesity
        if (Array.exists<Text>(healthConditions, func(c) { c == "Diabetes" })) {
            advice := advice # "It is important to monitor your blood sugar levels regularly. ";
        };
        if (Array.exists<Text>(healthConditions, func(c) { c == "Hypertension" })) {
            advice := advice # "Consider reducing sodium intake and regular exercise to manage your blood pressure. ";
        };
        if (Array.exists<Text>(healthConditions, func(c) { c == "Obesity" })) {
            advice := advice # "Focus on a balanced diet and regular physical activity to manage your weight. ";
        };
        
        return advice != "" ? advice : "No specific health conditions identified.";
    };

    // Function to generate lifestyle advice based on lifestyle habits
    private func generateLifestyleAdvice(lifestyleHabits: [Text]) : Text {
        var advice = "";
        
        // Example habits: Exercise, Smoking, Alcohol consumption
        if (Array.exists<Text>(lifestyleHabits, func(h) { h == "Exercise" })) {
            advice := advice # "Great job staying active! Keep up with regular exercise. ";
        };
        if (Array.exists<Text>(lifestyleHabits, func(h) { h == "Smoking" })) {
            advice := advice # "Quitting smoking will significantly improve your health. ";
        };
        if (Array.exists<Text>(lifestyleHabits, func(h) { h == "Alcohol" })) {
            advice := advice # "Reducing alcohol intake will benefit your liver and overall health. ";
        };
        
        return advice != "" ? advice : "Maintaining a healthy lifestyle is essential for long-term well-being.";
    };

    // Debug function to test AI health coach functionality
    public func debugRecommendation(username: Text) : async () {
        let recommendation = await generateRecommendation(username);
        Debug.print("Health Recommendation for " # username # ": " # recommendation.message # " - " # recommendation.advice);
    };
};
